<?php

namespace App\Imports;

use App\Models\Person;
use Maatwebsite\Excel\Concerns\ToModel;

class PeopleImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Person([
            'first_name'    => $row[0],
            'last_name'     => $row[1],
            'email_address' => $row[2],
            'status'        => $row[3]
        ]);
    }
}
