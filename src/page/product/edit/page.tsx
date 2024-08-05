import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, InputNumber, message } from "antd";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
};
const ProductEditPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {id}= useParams();
  const queryClient = useQueryClient();
  const {data,isLoading} = useQuery({
    queryKey:['product',id],
    queryFn:async()=>{
      try {
        return await instance.get(`/products/${id}`);
      } catch (error) {
        
      }
    }
    
  })
  console.log(data);
  const { mutate } = useMutation({
    mutationFn: async (product: FieldType) => {
      try {
        return await instance.put(`/products/${id}`, product);
      } catch (error) {
        throw new Error("cập nhật thất bại");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      messageApi.open({
        type: "success",
        content: "cập nhật sản phẩm thành công",
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  if(isLoading)return <div>loading...</div>
  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Cập nhật: {data?.data?.name}</h1>
                <Button type="primary">
                    <Link to={`/admin/product`}>
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={data?.data }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="name"
          rules={[{ required: true, message: "bạn phải nhận tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="price"
          name="price"
          rules={[
            { required: true, message: "bạn phải nhập giá!" },
            { type: "number", min: 0, message: "nhập số phải dương!" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item<FieldType> label="ảnh sản phẩm" name="image">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Miêu tả" name="description">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEditPage;
