<?php

namespace App\Imports;

use App\Models\Person;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PeopleImport implements ToModel, WithValidation, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Person([
            'first_name'    => $row['first_name'],
            'last_name'     => $row['last_name'],
            'email_address' => $row['email_address'],
            'status'        => $row['status']
        ]);
    }

    public function rules(): array
    {
        return [
            'first_name'    => 'required|max:255',
            'last_name'     => 'required|max:255',
            'email_address' => 'required|email',
            'status'        => Rule::in(['active', 'archived']),
            'group_id'      => 'nullable|exists:groups,id'
        ];
    }
}
