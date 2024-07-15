import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
 
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, customers, queryParams = null, success }) {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {

        if (value) {
            let filter = queryParams.filter || {};
            filter[name] = value;
            queryParams = {
                filter
            }
        } else {
            delete queryParams.filter[name];
        }

        router.get(route("users.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("users.index"), queryParams);
    };


  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("users.destroy", user.id));
  };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Users
                    </h2>
                    <Link
            href={route("users.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading name="id"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Id
                                            </TableHeading>


                                            <TableHeading
                                                name="name"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>


                                            <TableHeading
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                name="email"
                                            >
                                                Email
                                            </TableHeading>

                                            <TableHeading
                                                name="customer_name"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Customer Name
                                            </TableHeading>

                                            <th className="px-3 py-3">Roles</th>

                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">
 
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.name}
                                                    placeholder="Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("name", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("name", e)}
                                                />

                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.email}
                                                    placeholder="Email"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("email", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("email", e)}
                                                />
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.customer_id}
                                                    onChange={(e) =>
                                                        searchFieldChanged("customer_id", e.target.value)
                                                    }
                                                >
                                                    <option value=""> - - - - </option>
                                                    {customers.map((customer) => (
                                                        <option key={customer.id} value={customer.id}>
                                                            {customer.name}
                                                        </option>
                                                    ))}

                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.roles}
                                                    onChange={(e) =>
                                                        searchFieldChanged("roles", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select roles</option>
                                                    <option value="User">User</option>
                                                    <option value="Manager">Manager</option>

                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3 text-right"> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={user.id}
                                            >

                                                <td className="px-3 py-2">{user.id}</td>
                                                <th className="px-3 py-2">{user.attributes.name}</th>
                                                <th className="px-3 py-2">{user.attributes.email}</th>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {user.attributes.customer_name}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {user.attributes.roles}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route("users.edit", user.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteUser(user)}
                                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}