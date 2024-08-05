import instance from "@/configs/axios";
import { IProduct } from "@/type/product";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Image, message, Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";

type Props = {};
const ProductPage = (props: Props) => {
  const clien = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage();
  const { data } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data } = await instance.get(`/products`);
      return data.map((product: IProduct) => ({
        key: product.id,
        ...product,
      }));
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const data = await instance.delete(`/products/${id}`);
    },
    onSuccess: () => {
      messageApi.success("xóa sản phẩm thành công");
      clien.invalidateQueries();
    },
    onError: () => {
      messageApi.error("xóa sản phẩm thất bại");
    },
  });
  const columns = [
    {
      key: "image",
      title: "Image",
      render: (_: any, product: IProduct) => (
        <>
          <Image src={product.image} />
        </>
      ),
    },
    {
      key: "name",
      dataIndex: "name",
      title: "name",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "price",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "description",
    },
    {
      key: "action",
      render: (_: any, product: IProduct) => (
        <>
          <Popconfirm
            title="Xóa sản phẩm"
            description="bạn có muốn xóa sản phẩm không?"
            onConfirm={() => mutate(product.id!)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>

          <Link to={`/admin/product/${product.id}/edit`}>
            {" "}
            <Button>Cập nhật</Button>
          </Link>
        </>
      ),
    },
  ];
  console.log(data);
  return (
    <div>
      <div className="flex justify-between item-center mb-5">
        <h1 className="text-2xl font-semibold">Danh sách sản phẩm</h1>
        <Button type="primary"> <Link to={`/admin/product/add`}><PlusCircleFilled />Thêm sản phẩm</Link></Button>
      </div>
      {contextHolder}
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default ProductPage;
