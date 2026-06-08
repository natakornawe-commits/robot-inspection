export type ResultType = 'good' | 'bad' | 'na' | null;
export type ActionType = 'CL' | 'O' | 'G' | 'A' | 'W' | 'X' | 'R' | 'N/A'|'';
export type RobotType = 'haipick' | 'a71';

export interface CheckItem {
  id: string;
  label: string;
  ref?: string;
  hasValue: boolean;
  unit?: string;
}

export interface SubSection {
  id: string;
  title: string;
  items: CheckItem[];
}

export interface Section {
  id: string;
  num: string;
  icon: string;
  title: string;
  subtitle: string;
  sub: SubSection[];
}

export interface ItemState {
  result: ResultType;
  value: string;
  action: ActionType;
  photos: string[];
  notes: string;
}

export interface InspectionState {
  [key: string]: ItemState;
}

export interface InspectionInfo {
  date: string;
  robot: string;
  inspector: string;
  witness: string;
}
