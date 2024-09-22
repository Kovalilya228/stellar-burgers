import profileReducer, {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchGetUser,
  fetchUpdateUser,
  fetchForgotPassword,
  fetchResetPassword,
  profileInitialState as initialState
} from './profileSlice';

describe('profile slice', () => {
  const user = {
    id: 1,
    name: 'John Doe'
  };

  const refreshToken = 'token';

  it('should handle fetchRegister.pending', () => {
    const action = { type: fetchRegister.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchRegister.fulfilled', () => {
    const action = {
      type: fetchRegister.fulfilled.type,
      payload: { user, refreshToken }
    };
    const state = profileReducer(initialState, action);

    expect(state.data).toEqual(user);
    expect(state.isLogin).toBe(true);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchRegister.rejected', () => {
    const action = { type: fetchRegister.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchLogin.pending', () => {
    const action = { type: fetchLogin.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchLogin.fulfilled', () => {
    const action = {
      type: fetchLogin.fulfilled.type,
      payload: { user, refreshToken }
    };
    const state = profileReducer(initialState, action);

    expect(state.data).toEqual(user);
    expect(state.isLogin).toBe(true);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchLogin.rejected', () => {
    const action = { type: fetchLogin.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchLogout.pending', () => {
    const action = { type: fetchLogout.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchLogout.fulfilled', () => {
    const action = { type: fetchLogout.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state.data).toBe(null);
    expect(state.isLogin).toBe(false);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchLogout.rejected', () => {
    const action = { type: fetchLogout.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchGetUser.pending', () => {
    const action = { type: fetchGetUser.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchGetUser.fulfilled', () => {
    const action = {
      type: fetchGetUser.fulfilled.type,
      payload: { user }
    };
    const state = profileReducer(initialState, action);

    expect(state.data).toEqual(user);
    expect(state.fetchProfilePending).toBe(false);
    expect(state.isLogin).toBe(true);
  });

  it('should handle fetchGetUser.rejected', () => {
    const action = { type: fetchGetUser.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchUpdateUser.pending', () => {
    const action = { type: fetchUpdateUser.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchUpdateUser.fulfilled', () => {
    const action = {
      type: fetchUpdateUser.fulfilled.type,
      payload: { user }
    };
    const state = profileReducer(initialState, action);

    expect(state.data).toEqual(user);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchUpdateUser.rejected', () => {
    const action = { type: fetchUpdateUser.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchForgotPassword.pending', () => {
    const action = { type: fetchForgotPassword.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchForgotPassword.fulfilled', () => {
    const action = { type: fetchForgotPassword.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state.isEmailForResetSent).toBe(true);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchForgotPassword.rejected', () => {
    const action = {
      type: fetchForgotPassword.rejected.type,
      payload: 'Error'
    };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle fetchResetPassword.pending', () => {
    const action = { type: fetchResetPassword.pending.type };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchResetPassword.fulfilled', () => {
    const action = { type: fetchResetPassword.fulfilled.type };
    const state = profileReducer(initialState, action);

    expect(state.isEmailForResetSent).toBe(false);
    expect(state.fetchProfilePending).toBe(false);
  });

  it('should handle fetchResetPassword.rejected', () => {
    const action = { type: fetchResetPassword.rejected.type, payload: 'Error' };
    const state = profileReducer(initialState, action);

    expect(state.fetchProfilePending).toBe(false);
    expect(state.error).toBe('Error');
  });
});
