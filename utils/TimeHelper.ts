/**
 *
 *
 * @author: David Buch
 */

import { duration } from 'moment';

export const durationToStr = (ms: number) => {
  const h = duration(ms).hours();
  const m = duration(ms).minutes();
  const s = duration(ms).seconds();

  let hStr = '';
  if (h !== 0) hStr = `${h}:`;

  let mStr = '';
  mStr = m < 10 ? `0${m}` : m.toString();

  let sStr = '';
  sStr = s < 10 ? `0${s}` : s.toString();

  return `${hStr}${mStr}:${sStr}`;
};
