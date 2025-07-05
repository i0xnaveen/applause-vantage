import { Map } from 'immutable'


export const standardInitialState = Map({
  loading: false,
  success: false,
  error: null,
})

export function makeStandardReducer(SCOPE, RESETS){
  return function standardReducer(state = standardInitialState, action) {
    if (RESETS.includes(action.type)) return standardInitialState

    switch(action.type){
      case SCOPE.START:
        return standardInitialState.set('loading', true)
      case SCOPE.SUCCESS:
        return state.withMutations((a)=>{
          a.set('loading', false),
          a.set('success', true)
        })
      case SCOPE.ERROR:
        return state.withMutations((a)=>{
          a.set('loading', error),
          a.set('error', action.error)
        })
      default: 
        return state
    }
  }
}