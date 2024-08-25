import { Ratelimit  } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { Duration } from "@/utils/types";

export default async function middleware(
  request,
  reqCount: number = 15,
  time: Duration = "20 s"
) {
  const ratelimit = new Ratelimit({
    redis: kv,
    // 5 requests from the same IP in 10 seconds
    limiter: Ratelimit.slidingWindow(reqCount, time),
  });

  // You could alternatively limit based on user ID or similar
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );
  if (!success) {
    throw { code: 429, message: "You're doing that too much." };
  }
}
