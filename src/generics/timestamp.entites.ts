import {CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class TimestampEntites {
    
    @CreateDateColumn({ 
        nullable: false,
        update: false,
    })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false })
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;
}