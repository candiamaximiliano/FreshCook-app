import { Op } from 'sequelize';
import { Recipe} from ""
import { paginate } from '../../../client/src/components/Pagination/prueba';

export const listRecipes = async(req, res) => {
  try {
    //get the query params
    const { q, page, limit, order_by, order_direction } = req.query;

    let search = {};
    let order = [];

    //add the search term to the search object
    if (q) {
      search = {
        where: {
          name: {
            [Op.like]: `%${q}%`
          }
        }
      };
    }
    //add the order parameters to the order
    if (order_by && order_direction) {
      order.push([order_by, order_direction]);
    }
    //transform function that can be passed to the paginate method
    const transform = (recors) => {
      return records.map(record =>{
        return {
          id: record.id,
          name: record.name,
          date: moment(record.created_at).format('D-M-Y H: mm A')
        }
      });
    }
    //paginate method that takes in the model, page, limit, search object, order and transform
    const products = await paginate(ProductModel, page,limit,search, order, transform);

    return res.status(200).send({
      success: true,
      message: 'Fetched products',
      data: products
    })
  } catch(error) {
    console.log('Failed to fetch products', error);
    return res.status(500).send({
      success: false,
      message: 'Failed to fetch products'
    })
  }
}