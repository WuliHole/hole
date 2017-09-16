interface StreamIoPyload {
  next: string
  results: NotificationEntity[]
  unread: number
  unseen: number
}

interface NotificationEntity {
  activities: Activity[]
  activity_count: number,
  actor_count: number,
  created_at: ISO_STRING,
  group: string,
  id: string,
  is_read: boolean,
  is_seen: boolean,
  updated_at: ISO_STRING,
  verb: string
}

type ISO_STRING = string

interface Activity {
  /**
   * actor user id
   */
  actor: string,
  actorNickname: string
  foreign_id: string,
  comment?: string
  postTitle?: string
  id: string
  object: string
  origin: string,
  target: string,
  time: ISO_STRING,
  to: string[],
  verb: string
}