// Pure message protocol helpers for the synthetic iframe compatibility probe.
// These functions grant no permission to access GitHub or Instagram data.
export const PROTOCOL = 'reading-room-iframe-poc-v1';
export const ALLOWED_PARENTS = Object.freeze([
  'https://www.instagram.com',
  'https://instagram.com',
]);

export function isAllowedParent(origin) {
  return ALLOWED_PARENTS.includes(origin);
}

export function validHello(event, expectedParent = window.parent) {
  const d = event?.data;
  return event?.source === expectedParent &&
    isAllowedParent(event?.origin) &&
    d?.protocol === PROTOCOL &&
    d?.type === 'hello' &&
    typeof d?.challenge === 'string' &&
    /^[0-9a-f]{32}$/.test(d.challenge);
}

export function readyPacket(challenge, capabilities) {
  return { protocol: PROTOCOL, type: 'ready', challenge, capabilities: {
    separateOrigin: true,
    localSyntheticStorage: !!capabilities.localSyntheticStorage,
  }};
}
