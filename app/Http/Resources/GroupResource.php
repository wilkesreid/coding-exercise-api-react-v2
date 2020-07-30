<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GroupResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'group_name'    => $this->group_name,
            'people'        => $this->people->map(function($person) {
                return $person->first_name . ' ' . $person->last_name;
            })->join(', ')
        ];
    }
}
