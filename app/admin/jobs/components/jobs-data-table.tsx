"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Application, ApplicationStatus } from "@prisma/client";
import type { JobWithRelations } from "@/types";

// This would typically come from your API

export function JobsDataTable({
	jobs,
}: {
	jobs: JobWithRelations[];
}) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [rowSelection, setRowSelection] = React.useState({});

	const columns: ColumnDef<JobWithRelations>[] = [
		{
			accessorKey: "title",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Title
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<Link
					href={`/admin/jobs/${row.original.id}`}
					className="font-medium hover:underline"
				>
					{row.getValue("title")}
				</Link>
			),
		},
		{
			accessorKey: "companyUserId",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Company
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<Link
					href={`/admin/companies/${row.original.Company?.userId}`}
					className="text-muted-foreground hover:underline"
				>
					{row.getValue("companyUserId")}
				</Link>
			),
		},
		{
			accessorKey: "location",
			header: "Location",
			cell: ({ row }) => <div>{row.getValue("location")}</div>,
		},
		{
			header: "Total Applications",
			accessorKey: "applications",
			cell: ({ row }) => {
				const applications = row.getValue("applications") as Application[];
				const count = applications.length;
				return <div>{count}</div>;
			},
		},
		{
			accessorKey: "applicationStatus",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Status
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => {
				const status = row.getValue("applicationStatus") as ApplicationStatus;
				return (
					<Badge
						variant={
							status === "ACCEPTED"
								? "success"
								: status === "REVIEWED"
									? "secondary"
									: status === "REJECTED"
										? "destructive"
										: "pending"
						}
					>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</Badge>
				);
			},
		},
		{
			id: "actions",
			cell: ({ row }) => {
				const job = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<Link href={`/admin/jobs/${job.id}`}>
									<Eye className="mr-2 h-4 w-4" />
									View
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href={`/admin/jobs/${job.id}/edit`}>
									<Pencil className="mr-2 h-4 w-4" />
									Edit
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								<Trash className="mr-2 h-4 w-4" />
								Delete Job
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: jobs,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			rowSelection,
		},
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<p className="text-muted-foreground text-sm">Show</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<p className="text-muted-foreground text-sm">entries</p>
				</div>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No jobs found. Try adjusting your search criteria.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="text-muted-foreground text-sm">
					Showing{" "}
					<span className="font-medium">
						{table.getState().pagination.pageIndex *
							table.getState().pagination.pageSize +
							1}
					</span>{" "}
					to{" "}
					<span className="font-medium">
						{Math.min(
							(table.getState().pagination.pageIndex + 1) *
								table.getState().pagination.pageSize,
							table.getFilteredRowModel().rows.length,
						)}
					</span>{" "}
					of{" "}
					<span className="font-medium">
						{table.getFilteredRowModel().rows.length}
					</span>{" "}
					results
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
