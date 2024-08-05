import instance from "@/configs/axios";
import { IProduct } from "@/type/product";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link } from "react-router-dom";

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
};
const ProductAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [form] = useForm();
  const { mutate } = useMutation({
    mutationFn: async (product: FieldType) => {
      try {
        return await instance.post(`/products/`, product);
      } catch (error) {
        throw new Error("thêm thất bại");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      messageApi.open({
        type: "success",
        content: "thêm sản phẩm thành công",
      });
      form.resetFields();
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
  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Thêm sản phẩm</h1>
                <Button type="primary">
                    <Link to={`/admin/product`}>
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "bạn phải nhận tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "bạn phải nhập giá!" },
            { type: "number", min: 0, message: "nhập số phải dương!" },
          ]}
        >
          <InputNumber addonAfter={`vnd`} />
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

export default ProductAddPage;
