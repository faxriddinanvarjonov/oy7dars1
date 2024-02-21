import { combineReducers, createStore } from "redux";
import { counter } from "./counter";
import { customers } from "./cusmoner";

let rootReduce = combineReducers({
  counter: counter,
  customers: customers,
});

export let store = createStore(rootReduce);
