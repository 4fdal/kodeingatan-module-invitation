import { kirequest } from '@kodeingatan/Requests/Index';

/**
 *
 *
 * @export
 * @param {{text, _token}} text
 * @return {Promise<Response>}
 */
export function textToInputObject({ text, _token }) {
  return kirequest(
    'POST',
    route('admin.invitation.generate.text.to.input-object'),
    { text, _token }
  );
}
