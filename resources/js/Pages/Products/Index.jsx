import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PRODUCT_STATUS_CLASS_MAP,
    PRODUCT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, products, queryParams = null, success }) {
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

        router.get(route("products.index"), queryParams);
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
        router.get(route("products.index"), queryParams);
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Product Catalog
                    </h2>
 
                </div>
            }
        >
            <Head title="Products" />

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
                                            <TableHeading name="sku"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                SKU
                                            </TableHeading>

                                            <TableHeading
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                                name="barcode"
                                            >
                                                Barcode
                                            </TableHeading>

                                            <TableHeading
                                                name="name"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Name
                                            </TableHeading>

                                            <th className="px-3 py-3">Status</th>


                                            <TableHeading
                                                name="publishedAt"
                                                sort={queryParams.sort}
                                                sort_direction={queryParams.sort_direction}
                                                sortChanged={sortChanged}
                                            >
                                                Published Date
                                            </TableHeading>

                                            <th className="px-3 py-3">Price</th>
                                            <th className="px-3 py-3">Quantity</th>

                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.sku}
                                                    placeholder="SKU"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("sku", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("sku", e)}
                                                />

                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.barcode}
                                                    placeholder="Barcode"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("barcode", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("barcode", e)}
                                                />

                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={queryParams.filter?.name}
                                                    placeholder="product Name"
                                                    onBlur={(e) =>
                                                        searchFieldChanged("name", e.target.value)
                                                    }
                                                    onKeyPress={(e) => onKeyPress("name", e)}
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
                                                    <option value="P">Pending</option>
                                                    <option value="A">Active</option>
                                                    <option value="X">Cancelled</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={product.id}
                                            >
                                                <td className="px-3 py-2">{product.attributes.sku}</td>
                                                <td className="px-3 py-2">{product.attributes.barcode}</td>
                                                <th className="px-3 py-2">
                                                    
                                                        {product.attributes.name}
                                                   
                                                </th>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={
                                                            "px-2 py-1 rounded text-white " +
                                                            PRODUCT_STATUS_CLASS_MAP[product.attributes.status]
                                                        }
                                                    >
                                                        {PRODUCT_STATUS_TEXT_MAP[product.attributes.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {product.attributes.publishedAt}
                                                </td>
                                                <td className="px-3 py-2 ">
                                                    {product.attributes.price}
                                                </td>
                                                <td className="px-3 py-2">{product.attributes.quantity}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={products.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}