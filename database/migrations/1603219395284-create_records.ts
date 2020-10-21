import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createRecords1603219395284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'records',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'type',
                    type: 'integer'
                },
                {
                    name: 'amount_available',
                    type: 'integer'
                },
                {
                    name: "phone",
                    type: "integer"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('records');
    }

}
