export type SenecToken<DataT> = {
  notify(
    //
    hub: SenecHub,
    data: DataT,
  ): void;

  listen(
    hub: SenecHub,
    fn: {
      (data: DataT): void;
    },
  ): {
    (): void;
  };
};

export type SenecHub = {
  sub(): SenecHub;
};

export const oneSenecHub: SenecHub;

export function createSenecToken<T>(): SenecToken<T>;
