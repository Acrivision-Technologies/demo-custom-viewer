import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import clientIModelSlice from './slices/clientIModel'
import elementCollectionUiSlice from './slices/elementCollectionUi'
import iModelCreatedSlice from './slices/newlyCreatedClientIModel'

// ...

export const store = configureStore({
  reducer: {
    clientIModel: clientIModelSlice,
    elementCollectionUi: elementCollectionUiSlice,
    iModelCreated: iModelCreatedSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch