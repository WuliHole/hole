export default function assert(cond, msg?) {
  if (!cond) {
    throw new Error(`[Assert Failed]:${msg ? msg : ''}`)
  }
}
