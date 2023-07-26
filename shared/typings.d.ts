export type Coordinates = { left: number; top: number };

export interface ServerToClientEvents {
  pong: (data: number) => void;
  allMouseActivity: (data: { session_id: string; coords: Coordinates }) => void;
}

export interface ClientToServerEvents {
  mouseMove: (data: Coordinates) => void;
  ping: (data: string) => void;
}
