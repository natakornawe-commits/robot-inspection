export { HAIPICK_SECTIONS } from './haipick';
export { A71_SECTIONS } from './a71';

import { HAIPICK_SECTIONS } from './haipick';
import { A71_SECTIONS } from './a71';
import type { RobotType, Section } from '@/types';

export function getSections(robot: RobotType): Section[] {
  return robot === 'haipick' ? HAIPICK_SECTIONS : A71_SECTIONS;
}

export function makeItemKey(robot: RobotType, sectionId: string, subId: string, itemId: string): string {
  return `${robot}_${sectionId}_${subId}_${itemId}`;
}
