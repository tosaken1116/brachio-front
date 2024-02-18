import { MutableRefObject } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { create } from "zustand";

type State = {
	socketRef: MutableRefObject<ReconnectingWebSocket | undefined> | null;
};

type Action = {
	setRef: (ref: MutableRefObject<ReconnectingWebSocket | undefined>) => void;
};

export const useRefStore = create<State & Action>()((set) => ({
	socketRef: null,
	setRef: (ref) => set(() => ({ socketRef: ref })),
}));
