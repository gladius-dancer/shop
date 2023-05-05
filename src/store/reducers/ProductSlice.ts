// // imports & thunk action creator omitted
//
// import { createSlice } from "@reduxjs/toolkit";
//
// type RequestState = "pending" | "fulfilled" | "rejected";
//
// export const pokemonSlice = createSlice({
//   name: "pokemon",
//   initialState: {
//     dataByName: {} as Record<string, undefined>,
//     statusByName: {} as Record<string, RequestState | undefined>,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchPokemonByName.pending, (state, action) => {
//       state.statusByName[action.meta.arg] = "pending";
//     });

// builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
//     state.statusByName[action.meta.arg] = 'fulfilled'
//     state.dataByName[action.meta.arg] = action.payload
// })
//
//
// builder.addCase(fetchPokemonByName.rejected, (state, action) => {
//     state.statusByName[action.meta.arg] = 'rejected'
// })
//   },
// });

// selectors omitted
