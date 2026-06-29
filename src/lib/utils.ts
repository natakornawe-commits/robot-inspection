import { HAIPICK_SECTIONS } from '@/data/haipick';
import { A71_SECTIONS } from '@/data/a71';
import type { Section } from '@/types';

export function makeItemKey(
  robot: string,
  secId: string,
  subId: string,
  itemId: string
): string {
  return `${robot}_${secId}_${subId}_${itemId}`;
}

export function getSectionsStatic(robot: string): Section[] {
  return robot === 'haipick' ? HAIPICK_SECTIONS : A71_SECTIONS;
}