import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export interface Duty {
  daily?: {
    id: string;
    text: string;
    number: number;
    date: string;
    duration: string;
    roomId: string;
    roomName: string;
  }[];
  weekly?: {
    id: string;
    text: string;
    number: number;
    date: string;
    duration: string;
    roomId: string;
    roomName: string;
  }[];
  monthly?: {
    id: string;
    text: string;
    number: number;
    date: string;
    duration: string;
    roomId: string;
    roomName: string;
  }[];
}

interface Room {
  id: string;
  name: string;
  icon: string;
  tasks: {
    daily: Duty[];
    weekly: Duty[];
    monthly: Duty[];
  };
}

export interface Duties {
  daily: Duty[];
  weekly: Duty[];
  monthly: Duty[];
}

interface UserState {
  user: {
    id: string;
    email: string | null;
    token?: string | null;
    rooms?: Room[];
  } | null;
  token: string | null;
  duty: Duty[] | null;
  rooms: Room[];
  roomId: string;
  duties: Duties;
}

const initialState: UserState = {
  user: null,
  token: null,
  duty: [],
  rooms: [],
  roomId: "",
  duties: { daily: [], weekly: [], monthly: [] },
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
      state.duty = null;
      state.rooms = [];
    },
    setDuty: (state, action: PayloadAction<Duty>) => {
      const newDuty = action.payload;
      let duration: string | undefined;

      if (newDuty.daily) {
        duration = newDuty.daily[0]?.duration;
      } else if (newDuty.weekly) {
        duration = newDuty.weekly[0]?.duration;
      } else if (newDuty.monthly) {
        duration = newDuty.monthly[0]?.duration;
      }

      if (!duration) {
        Toast.show({
          type: "error",
          text1: "Görevin süresi bulunamadı.",
          position: "bottom",
        });
        return;
      }

      switch (duration) {
        case "GÜNLÜK":
          state.duties.daily.push(newDuty);
          break;
        case "HAFTALIK":
          state.duties.weekly.push(newDuty);
          break;
        case "AYLIK":
          state.duties.monthly.push(newDuty);
          break;
        default:
          Toast.show({
            type: "error",
            text1: "Görevin geçersiz bir süresi var.",
            position: "bottom",
          });
          return;
      }

      Toast.show({
        type: "success",
        text1: `Görev başarıyla eklendi`,
        position: "bottom",
      });
    },
    addDuty: (
      state,
      action: PayloadAction<{ type: keyof Duties; duty: Duty }>
    ) => {
      const { type, duty } = action.payload;
      state.duties[type].push(duty);
    },

    addRoom: (state, action: PayloadAction<Room>) => {
      const newRoom: Room = {
        ...action.payload,
        tasks: { daily: [], weekly: [], monthly: [] },
      };
      state.rooms.push(newRoom);
    },
    addTaskToRoom: (
      state,
      action: PayloadAction<{
        roomId: string;
        type: keyof Room["tasks"]; // daily, weekly, monthly
        task: Duty;
      }>
    ) => {
      const { roomId, type, task } = action.payload;
      const room = state.rooms.find((r) => r.id === roomId);

      if (!room) {
        Toast.show({
          type: "error",
          text1: "Oda bulunamadı.",
          position: "bottom",
        });
        return;
      }

      // Oda bulunursa, ilgili görevi doğru türdeki diziye ekleyelim
      room.tasks[type].push(task);

      Toast.show({
        type: "success",
        text1: `Görev başarıyla ekledi: ${task}`,
        position: "bottom",
      });
    },
  },
});

export const {
  setUser,
  logout,
  setDuty,
  addRoom,
  addTaskToRoom,
  setRoomId,
  addDuty,
} = userSlice.actions;

export default userSlice.reducer;
