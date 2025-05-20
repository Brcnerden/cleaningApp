import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export interface Duty {
  id: string;
  text: string;
  number: number;
  date: string;
  duration: string;
  roomId: string;
  roomName: string;
}

interface Room {
  id: string;
  name: string;
  icon: string;
  tasks: Duty[];
}

interface UserState {
  user: {
    id: string;
    email: string | null;
    token?: string | null;
    rooms?: Room[];
  } | null;
  token: string | null;
  rooms: Room[];
  roomId: string;
  duties: Duty[];
}

const initialState: UserState = {
  user: null,
  token: null,
  rooms: [],
  roomId: "",
  duties: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload || null;
      state.token = action.payload?.token ?? null;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.rooms = [];
    },
    setDuty: (state, action: PayloadAction<Duty>) => {
      const newDuty = action.payload;

      if (!newDuty.duration) {
        Toast.show({
          type: "error",
          text1: "Görevin süresi bulunamadı.",
          position: "bottom",
        });
        return;
      }

      state.duties.push(newDuty); // Görevi doğrudan duties dizisine ekle

      Toast.show({
        type: "success",
        text1: `Görev başarıyla eklendi`,
        position: "bottom",
      });
    },

    addRoom: (state, action: PayloadAction<Room>) => {
      const newRoom: Room = {
        ...action.payload,
        tasks: [],
      };
      state.rooms.push(newRoom);
    },

    addTaskToRoom: (
      state,
      action: PayloadAction<{
        roomId: string;
        task: Duty;
      }>
    ) => {
      const { roomId, task } = action.payload;
      const room = state.rooms.find((r) => r.id === roomId);

      if (!room) {
        Toast.show({
          type: "error",
          text1: "Oda bulunamadı.",
          position: "bottom",
        });
        return;
      }

      room.tasks.push(task); // Görevi ilgili odanın görev listesine ekle

      Toast.show({
        type: "success",
        text1: `Görev başarıyla eklendi: ${task.text}`,
        position: "bottom",
      });
    },
  },
});

export const { setUser, logout, setDuty, addRoom, addTaskToRoom, setRoomId } =
  userSlice.actions;

export default userSlice.reducer;
