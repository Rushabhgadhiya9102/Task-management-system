import { createSlice } from "@reduxjs/toolkit";
import {
  createData,
  deleteData,
  fetchData,
  updateData,
} from "../../thunk/thunk";

// ----------- I N I T I A L S - S T A T E -----------

const initialState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: false,
};

// ----------- S L I C E - C R E A T E -----------

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    clearSelectedTodo: (state) => {
      state.selectedTodo = null;
    },

    markTaskAsDone: (state, action) => {
      const id = action.payload;
      const index = state.todos.findIndex((task) => task.id === id);

      if (index !== -1) {
        state.todos[index].isDone = true;
      }
    },
  },
  extraReducers: (builder) => {
    // --------------- F E T C H - D A T A ---------------

    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.todos = action.payload;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // ---------------- C R E A T E - D A T A ----------------

    builder.addCase(createData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createData.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    });

    builder.addCase(createData.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // ---------------- D E L E T E - D A T A ----------------

    builder.addCase(deleteData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });

    builder.addCase(deleteData.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });

    // ------------------ U P D A T E - D A T A ----------------

    builder.addCase(updateData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateData.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        } else {
          return todo;
        }
      });
    });

    builder.addCase(updateData.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setSelectedTodo, clearSelectedTodo, markTaskAsDone } = todoSlice.actions;
export default todoSlice.reducer;
