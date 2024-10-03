import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const logReps = mutation({
  args: {
    workoutId: v.string(),
    reps: v.number(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
      throw new Error("Not authorized")
    }

    // First check that the user can access the workout
    const wo = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("userId"), auth?.subject),
        q.eq(q.field("_id"), args.workoutId)
      )).first();

    if(wo) {
      await ctx.db.insert("logged_reps", {
        workoutId: args.workoutId,
        reps: args.reps,
        timestamp: Date.now()
      })
    }
  }
})

export const getEntry = query({
  args: {
    entryId: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
      throw new Error("Not authorized")
    }

    const entry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    return entry
  }
})

export const update = mutation({
  args: {
    entryId: v.string(),
    reps: v.number()
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
      throw new Error("Not authorized")
    }

    const entry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.entryId as Id, {
      reps: args.reps
    })
  }
})

export const remove = mutation({
  args: {
    entryId: v.string()
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity()
    if(!auth) {
        throw new Error("Not authorized")
    }

    const entry = await ctx.db.get(args.entryId as Id)
    if(!entry) {
      throw new Error("Not found")
    }

    const wo = await ctx.db.query("workouts")
      .filter(q => q.and(
        q.eq(q.field("_id"), entry.workoutId as Id),
        q.eq(q.field("userId"), auth.subject)
      )).first()
    if(!wo) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.entryId as Id)
  }
})