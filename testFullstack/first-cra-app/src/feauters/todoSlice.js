import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (get, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todo");
      const data = await res.json();

      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const deleteTodos = createAsyncThunk(
  "todos/delete",
  async (item, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todo/${item._id}`, {
        method: "DELETE",
      });
      return item._id;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const postTodos = createAsyncThunk(
  "todos/post",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const patchTodos = createAsyncThunk(
  "todos/patch",
  async (item, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todo/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: !item.done }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload.reverse();
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.pending = false;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
      });

    builder
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (item) => item._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteTodos.pending, (state, action) => {
          state.loading = true
      })

      builder
      .addCase(postTodos.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      .addCase(postTodos.rejected, (state, action) => {
          state.error = action.payload
          state.loading = false;
      })
      .addCase(postTodos.pending, ( state, action) => {
        state.loading = true
      })

      builder
      .addCase(patchTodos.fulfilled, (state, action) => {
        state.todos.map((item) => {
          if (item._id === action.payload._id) {
            return (item.done = !item.done);
          }
          state.loading = false;
        });
      })
      .addCase(patchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false
      })
      .addCase(patchTodos.pending, (state, action) => {
        state.loading = true
      })
      
  },
});

export default todoSlice.reducer;
