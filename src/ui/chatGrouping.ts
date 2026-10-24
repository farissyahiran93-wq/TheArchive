/** Presentation only: system events and other senders interrupt a bubble group. */
export function chatGroup(lines: readonly { sender: string }[], index: number) {
  const sender = lines[index].sender
  const first = index === 0 || lines[index - 1].sender !== sender
  const last = index === lines.length - 1 || lines[index + 1].sender !== sender
  return { first, last, className: `${first ? 'chat-group-start' : 'chat-group-continuation'} ${last ? 'chat-group-end' : 'chat-group-open'}` }
}
