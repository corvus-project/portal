import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user, customers, customer_id, roles, current_role_id}) {
    
  const { data, setData, post, errors, reset } = useForm({
    name: user.data.attributes.name || "",
    email: user.data.attributes.email || "",
    customer_id: customer_id || "",
    role_id: current_role_id || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("users.update", user.data.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      roles={auth.roles}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit user "{user.data.attributes.name}"
          </h2>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />

                <TextInput
                  id="user_name"
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
                <InputLabel htmlFor="user_email" value="User Email" />

                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
              </div>

              {auth.roles.includes('Admin') ? (
              <div className="mt-4">
                <InputLabel htmlFor="customer_id" value="Customers" />

                <SelectInput
                  name="customer_id"
                  id="user_customer_id"
                  className="mt-1 block w-full"
                  value={data.customer_id}
                  onChange={(e) => setData("customer_id", e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option value={customer.id} key={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.customer_id} className="mt-2" />
              </div> 
              ):(
              <TextInput
                  id="customer_id"
                  type="hidden"
                  name="customer_id"
                  value={data.customer_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("customer_id", e.target.value)}
                />
                )}

 
              <div className="mt-4">
                <InputLabel htmlFor="role_id" value="Role" />

                <SelectInput
                  name="role_id"
                  id="user_role_id"
                  value={data.role_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("role_id", e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.name}
                    </option>
                  ))}
                </SelectInput>

                <InputError message={errors.role_id} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_password" value="Password" />

                <TextInput
                  id="user_password"
                  type="password"
                  name="password"
                  value={data.password}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("password", e.target.value)}
                />

                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_password_confirmation"
                  value="Confirm Password"
                />

                <TextInput
                  id="user_password_confirmation"
                  type="password"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  className="mt-1 block w-full"
                  onChange={(e) =>
                    setData("password_confirmation", e.target.value)
                  }
                />

                <InputError
                  message={errors.password_confirmation}
                  className="mt-2"
                />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("users.index")}
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