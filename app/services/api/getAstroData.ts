import uri from '@app/utils/uri';
import api from './api';
import {AstroDataResponse} from '@app/types/api';

const getAstroData = async (
  query: string,
): Promise<AstroDataResponse | null> => {
  try {
    const res = await api.get(
      uri.BASE_URL + `astronomy.json?key=${uri.key}&q=${query}`,
    );

    if (res.data) {
      return res.data as AstroDataResponse;
    }

    return null;
  } catch (error) {
    console.error('Error fetching astronomy data:', error);
    return null;
  }
};

export default getAstroData;
