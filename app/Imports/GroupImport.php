<?php

namespace App\Imports;

use App\Models\Group;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GroupImport implements ToModel, WithValidation, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Group([
            'group_name'    => $row['group_name']
        ]);
    }

    public function rules(): array
    {
        return [
            'group_name' => 'required|string'
        ];
    }
}
