/**
 * @constants STEIN_EFISHERY_URI
 * TODO: create a .env file and move this into .env file
 */
export const STEIN_EFISHERY_URI =
  "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

/**
 * @constant EFISHERY_API
 * @description eFishery API collections
 */
export const EFISHERY_API = {
  queries: {
    options: {
      area: `${STEIN_EFISHERY_URI}/option_area`,
      size: `${STEIN_EFISHERY_URI}/option_size`,
    },
    list: `${STEIN_EFISHERY_URI}/list`,
  },
  mutations: {
    add_list: `${STEIN_EFISHERY_URI}/Sheet1`,
  },
};
