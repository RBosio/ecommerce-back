export interface EntityFactory<T> {
  create(...args: any): T;
}
