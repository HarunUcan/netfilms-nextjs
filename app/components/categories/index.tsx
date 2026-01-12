import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";

interface Category {
    id: number;
    name: string;
}

function Categories({ categories }: { categories: Category[] }) {
    return (
        <div className={styles.categories}>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    className={styles.category}
                    href={`/${category.id}`}
                >
                    <div className={styles.name}>{category.name}</div>
                </Link>
            ))}
        </div>
    );
}

export { Categories };