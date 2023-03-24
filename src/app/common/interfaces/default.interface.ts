export interface IDataLoaded {
  isLoaded: boolean;
  hasErrors: boolean;
}
export interface IIdleDefaultConfig {
  idle?: number;
  timeout?: number;
}

export interface ISegmentSelector {
  label: string;
  value: string;
}