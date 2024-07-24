import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    CUSTOMER_STATUS_CLASS_MAP,
    CUSTOMER_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, customers, queryParams = null, success }) {
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

        router.get(route("customers.index"), queryParams);
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
        router.get(route("customers.index"), queryParams);
    };

    const deleteCustomer = (customer) => {
        if (!window.confirm("Are you sure you want to delete the customer?")) {
          return;
        }
        router.delete(route("customers.destroy", customer.id));
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Customers
                    </h2>
                    <Link
            href={route("customers.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
                </div>
            }
        >
            <Head title="Customers" />

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
 

                                            <th className="px-3 py-3">Status</th>



                                            <th className="px-3 py-3">Balance</th>
                                            <TableHeading
                                                name="createdAt"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Created Date
                                            </TableHeading>

                                            <th className="px-3 py-3"></th>

                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                        <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.name}
                                                    placeholder="Customer Name"
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
                                                    defaultValue={queryParams.filter?.status}
                                                    onChange={(e) =>
                                                        searchFieldChanged("status", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option> 
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"> </th>

                                            <th className="px-3 py-3"></th>
<th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.data.map((customer) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={customer.id}
                                            > 
                                                <th className="px-3 py-2">
                                                    
                                                        {customer.attributes.name}
                                                   
                                                </th>


                                                <th className="px-3 py-2">
                                                    
                                                        {customer.attributes.email}
                                                   
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            CUSTOMER_STATUS_CLASS_MAP[customer.attributes.status]
                                                        }
                                                    >
                                                        {CUSTOMER_STATUS_TEXT_MAP[customer.attributes.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {customer.attributes.balance}
                                                </td>
                                              
                                                <td className="px-3 py-2 text-nowrap">
                                                    {customer.attributes.createdAt}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    <Link
                                                        href={route("customers.edit", customer.id)}
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={(e) => deleteCustomer(customer)}
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
                            <Pagination links={customers.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}