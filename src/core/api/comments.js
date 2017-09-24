'use strict';

import {MemoryRetrieve, MemoryStore} from './memory.js';

/*
return {
  partial: function(),
  complete: function(),
  error: function()
}
*/
export default async ({root}, callbacks) => {
  // Fetch the missing values.
  try {
    const {$entities} = (await fetch(`/api/comments/${root}`)).json();
    MemoryStore($entities);
    callbacks.complete($entities);
  } catch(error) {
    callbacks.error(error);
  }
}