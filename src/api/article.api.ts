import axios from 'axios';
import { NET_CONFIG } from './api.config';
import store from 'store2'
import vuex_store from '../store'

const BASE_URL = NET_CONFIG.BACKEND_URL + 'article';

export async function get_field_list(
): Promise<{
  id: number,
  field: string
}[]> {
  try {
    const res = await axios({
      method: 'get',
      url: BASE_URL + '/get-field-list',
    });

    if (res && res.data) {
      return res.data
    }
  }
  catch (error) {
    // console.error(error)
  }
  return [];
}

export async function create_article(
  args: {
    userId: number,
    title: string,
    description: string,
    content:string,
    fieldId: number,
    tags: string[]
  }
): Promise<any> {
  try {
      const res = await axios({
          method: 'post',
          url: BASE_URL + '/create-article',
          data: {
              ...args
          },
      })
      if (res && res.data) {
        return res.data
      }
  } catch (error) {
      // console.error(error)
  }

}