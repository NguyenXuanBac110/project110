import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ComfirmDialog from "src/components/ComfirmDialog";
import { Product } from "src/types/product";

function AdminList() {
  const [confirm, setConfirm] = useState(false)
  const [products,setProducts] = useState<Product[]>([]);

  const getAllProduct = async () => {
     try {
       const { data } = await axios.get("http://localhost:3000/products");
       setProducts(data);
     } catch (error) {
       console.log(error)
     }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = () =>{
      setConfirm(true);
  }
  const handleDelete = () =>{
      console.log('delete')
  }

  // function createData(
  //   name: string,
  //   calories: number,
  //   fat: number,
  //   carbs: number,
  //   protein: number,
  // ) {
  //   return { name, calories, fat, carbs, protein };
  // }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  return <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">{product.image}</TableCell>
              <TableCell align="right">{product.category.name}</TableCell>
              <TableCell align="right">
                 <Stack direction={'row'} gap={3} justifyContent={'center'}>
                     <Link to={""}>Edit</Link>
                     <Button variant="Contained" sx={{ bgcolor: 'red'}} onClick={handleConfirm}>Delete</Button>
                 </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ComfirmDialog confirm={confirm} onComfirm={setConfirm} onDelete={handleDelete}/>
    </TableContainer>
  </>
}

export default AdminList;