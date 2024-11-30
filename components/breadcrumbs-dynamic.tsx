import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ChevronRight } from "lucide-react";

type BreadcrumbDynamicProps = {
	items: {
		label: string;
		href: string;
	}[];
};

export const BreadcrumbDynamic: React.FC<BreadcrumbDynamicProps> = ({
	items,
}) => {
	return (
		<Breadcrumb className="mb-6">
			<BreadcrumbList>
				{items.map((item, index) => (
					<BreadcrumbItem key={item.href}>
						<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
						{index < items.length - 1 && (
							<BreadcrumbSeparator>
								<ChevronRight className="h-4 w-4" />
							</BreadcrumbSeparator>
						)}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
