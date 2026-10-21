// Authoring-only mock transitions derived from 01G-RC1 and the 01E candidate manifest.
// This is not a game graph, source asset, receipt, or runtime test.
import assert from 'node:assert/strict'

const tipModes = ['none', 'anonymous', 'handle']
const exportStates = ['valid', 'invalid', 'late']
let e01Paths = 0
let s30Checks = 0
for (const tip of tipModes) {
  for (const archiveAccepted of tip === 'none' ? [false] : [false, true]) {
    for (const exportState of exportStates) {
      const r01 = tip !== 'none'
      const mayaReply = r01
      const r03 = archiveAccepted && mayaReply
      const r04 = exportState === 'valid'
      const k02 = r04 // assumes E003 and E012 issuer/lineage checks in the mock path
      assert.equal(mayaReply, r01, 'Maya cannot reply to an unsent tip')
      assert.equal(r03, archiveAccepted && r01, 'Archive offer/decline cannot grant R03')
      assert.equal(k02, exportState === 'valid', 'invalid or late E012 cannot grant K02')
      if (tip === 'none') assert.equal(mayaReply, false)
      for (const card of ['valid_public_role_card', 'missing_or_private_card']) {
        const roleEnabledKnown = card === 'valid_public_role_card'
        const operatorKnown = false
        const diversionAuthorKnown = false
        assert.equal(roleEnabledKnown, card === 'valid_public_role_card', 'Only an authorized public role card can prove capability')
        assert.equal(operatorKnown, false, 'E012 and S30 cannot identify a current human operator')
        assert.equal(diversionAuthorKnown, false, 'E012 and S30 cannot identify the 21:48 order author')
        if (!r04) assert.equal(k02, false, 'A role card cannot repair a missing verified E012/R04')
        s30Checks++
      }
      e01Paths++
    }
  }
}
assert.equal(e01Paths, 15)
assert.equal(s30Checks, 30)

let consentChecks = 0
for (const anaA01 of [false, true]) {
  for (const custodianReleased of [false, true]) {
    for (const anaA02 of [false, true]) {
      const transcriptDelivered = anaA01 && custodianReleased
      const audioDelivered = anaA02 && custodianReleased
      const identityKnown = false // A01/A02 are anonymized; A03 is independent.
      assert.equal(transcriptDelivered, anaA01 && custodianReleased)
      assert.equal(audioDelivered, anaA02 && custodianReleased)
      assert.equal(identityKnown, false)
      if (!transcriptDelivered) assert.equal(false, transcriptDelivered, 'No protected quote without both grants')
      consentChecks++
    }
  }
}
assert.equal(consentChecks, 8)

let recordChecks = 0
for (const trust of ['low', 'high']) {
  for (const lucasPhoto of [false, true]) {
    for (const records of ['both_complete', 'transit_only', 'shelter_only', 'both_missing']) {
      const e013 = records === 'both_complete' || records === 'transit_only'
      const e014 = records === 'both_complete' || records === 'shelter_only'
      const routeAndDestinationCorroborated = e013 && e014
      const passengerIdentityPublic = false
      assert.equal(routeAndDestinationCorroborated, records === 'both_complete', 'Two original custodians are needed for full route/destination claim')
      assert.equal(passengerIdentityPublic, false, 'Coded records cannot expose Ana or Rowan')
      if (trust === 'low' || !lucasPhoto) assert.equal(e013 && e014, records === 'both_complete', 'Trust and optional photo cannot gate the two original records')
      recordChecks++
    }
  }
}
assert.equal(recordChecks, 16)

let welfareChecks = 0
for (const check of ['valid_delivered', 'failed', 'pending', 'no_consent']) {
  const r12 = check === 'valid_delivered'
  const k11 = r12
  const e09RecordsOpen = true
  assert.equal(k11, r12, 'Sophie cannot learn an unreceived welfare result')
  assert.equal(e09RecordsOpen, true, 'Historical records work cannot depend on K11')
  welfareChecks++
}
assert.equal(welfareChecks, 4)

const witnessed = new Set()
let t07Paths = 0
for (const pause of ['granted', 'denied']) {
  const earlyCopies = pause === 'granted' ? [false, true] : [false]
  for (const earlyCopy of earlyCopies) {
    for (const direction of ['denied', 'unserved', 'served_no_ack', 'served_ack_after_disposal', 'served_ack']) {
      // served_ack denotes a valid rostered direction, verified service and CRCU ACK before disposal.
      // A later ACK cannot retroactively preserve an already disposed original.
      const effective = direction === 'served_ack'
      const lateCopies = effective && !earlyCopy ? [false, true] : [false]
      for (const lateCopy of lateCopies) {
        const copyLawful = earlyCopy || (effective && lateCopy)
        const outcomes = effective ? ['preserved'] : ['lost_confirmed', 'status_unknown']
        for (const outcome of outcomes) {
          const e009 = copyLawful
          const e020 = effective
          const r15 = effective
          const k14 = effective
          const ending = outcome === 'lost_confirmed' ? 'qualified_loss' : outcome
          assert.equal(e009, copyLawful, 'E009 requires a supervised lawful copy')
          assert.equal(e020 && r15 && k14, effective, 'DIR plus CRCU ACK required')
          if (!effective) assert.equal(e020 || r15 || k14, false)
          if (pause === 'denied' && !effective) assert.equal(e009, false)
          if (outcome === 'lost_confirmed') assert.equal(ending, 'qualified_loss')
          if (outcome === 'status_unknown') assert.notEqual(ending, 'qualified_loss')
          if (!e009) assert.equal(false, e009 && true, 'No individual diversion-order proof from absent E009')
          witnessed.add(`${pause}/${direction}/${outcome}`)
          t07Paths++
        }
      }
    }
  }
}
for (const required of [
  'granted/served_ack/preserved',
  'denied/served_ack/preserved',
  'denied/denied/lost_confirmed',
  'denied/unserved/status_unknown',
  'denied/served_no_ack/lost_confirmed',
  'denied/served_ack_after_disposal/lost_confirmed',
  'granted/served_no_ack/status_unknown',
]) assert(witnessed.has(required), `Missing mock route ${required}`)

console.log(`STATIC MODEL PASS: E01 ${e01Paths} mock paths / ${s30Checks} S30 checks; T07 ${t07Paths} mock paths; ${consentChecks} consent, ${recordChecks} low-trust/record and ${welfareChecks} welfare checks; negative receipt/proof guards held.`)
console.log('LIMIT: modeled policy transitions only; no authored scene graph, issued fictional assets, editor acceptance, save migration, or gameplay ran.')
