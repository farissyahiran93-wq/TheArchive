export const fixtureChoices = [
  { id: 'clear', text: 'I can read you clearly.' },
  { id: 'careful', text: 'Who is this test for?' },
] as const

export type FixtureEventId = 'fixture.hello' | 'fixture.check' | 'fixture.reply' | 'fixture.close'

export function fixtureLine(id: FixtureEventId, name: string, choice?: string): string {
  switch (id) {
    case 'fixture.hello': return `Hello, ${name}. This is a development conversation.`
    case 'fixture.check': return 'I am checking that messages arrive in order.'
    case 'fixture.reply': return choice === 'careful' ? 'Fair question. This is only a test channel.' : 'Good. Your reply reached me.'
    case 'fixture.close': return 'The test is complete. Your conversation will be here when you return.'
  }
}
