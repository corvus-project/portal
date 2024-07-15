import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, customer}) {

  const { data, setData, post, errors, reset } = useForm({
    name: customer.data.attributes.name || "",
    email: customer.data.attributes.email || "",
    status: customer.data.attributes.status || "",
    balance: customer.data.attributes.balance || "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("customers.update", customer.data.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit customer "{customer.data.attributes.name}"
          </h2>
        </div>
      }
    >
      <Head title="Customers" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">

                
                <InputLabel htmlFor="customer_name" value="Customer Name" />

                <TextInput
                  id="customer_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="customer_email" value="User Email" />

                <TextInput
                  id="customer_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>

 
              <div className="mt-4">
                <InputLabel htmlFor="status" value="Status" />

                <SelectInput
                  name="status"
                  id="customer_status"
                  value={(data.status === 'Active' ? 1 : 0)}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                           <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="customer_balance" value="balance" />

                <TextInput
                  id="customer_balance"
                  type="text"
                  name="balance"
                  value={data.balance}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("balance", e.target.value)}
                />

                <InputError message={errors.balance} className="mt-2" />
              </div>

             
              <div className="mt-4 text-right">
                <Link
                  href={route("customers.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}