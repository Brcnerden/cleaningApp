// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export interface Duty {
  text: string;
  number: number;
  date: string;
  id: string;
  duration: string;
  roomId: string;
  roomName: string; // roomName özelliği eklendi
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
}

const initialState: UserState = {
  user: null,
  token: null,
  duty: [],
  rooms: [],
  roomId: "",
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
      if (state.duty) {
        const isDutyExist = state.duty.some(
          (duty) => duty.text === newDuty.text && duty.date === newDuty.date
        );
        if (!isDutyExist) {
          state.duty.push(newDuty);
        } else {
          Toast.show({
            type: "error",
            text1: "Bu görev zaten var.",
            position: "bottom",
          });
        }
      } else {
        state.duty = [newDuty];
      }
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      const newRoom: Room = {
        ...action.payload,
        tasks: { daily: [], weekly: [], monthly: [] }, // Varsayılan görev listeleri
      };
      state.rooms.push(newRoom);
    },
    addTaskToRoom: (
      state,
      action: PayloadAction<{
        roomId: string;
        type: keyof Room["tasks"];
        task: Duty;
      }>
    ) => {
      if (!state.user?.rooms) {
        Toast.show({
          type: "error",
          text1: "Kullanıcı veya odalar bulunamadı.",
          position: "bottom",
        });
        return;
      }

      const roomIndex = state.user.rooms.findIndex(
        (room) => room.id === action.payload.roomId
      );

      if (roomIndex === -1) {
        Toast.show({
          type: "error",
          text1: "Belirtilen oda bulunamadı.",
          position: "bottom",
        });
        return;
      }

      const selectedRoom = state.user.rooms[roomIndex];

      // roomName'i de ekliyoruz
      state.user.rooms[roomIndex] = {
        ...state.user.rooms[roomIndex],
        tasks: {
          ...selectedRoom.tasks,
          [action.payload.type]: [
            ...selectedRoom.tasks[action.payload.type],
            {
              ...action.payload.task,
              roomName: selectedRoom.name, // roomName ekleniyor
            },
          ],
        },
      };
    },
  },
});

export const { setUser, logout, setDuty, addRoom, addTaskToRoom, setRoomId } =
  userSlice.actions;

export default userSlice.reducer;
