<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Http\Resources\GroupCollection;
use App\Http\Resources\GroupResource;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\GroupImport;
use App\Models\Group;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new GroupCollection(Group::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'group_name' => 'required|string'
        ]);

        $group = Group::create([
            'group_name' => $request->group_name
        ]);

        return (new GroupResource($group))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new GroupResource(Group::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Group::findOrFail($id)
            ->update($request->all());

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Group::findOrFail($id)
            ->delete();
        
        return response()->json(null, 204);
    }

    public function batchStore(Request $request)
    {
        $uuid = Str::uuid();
        $path = $request->file('csv')->storeAs('imports/groups', $uuid . '.csv');

        try {
            Excel::import(new GroupImport, $path);
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            unlink(storage_path('app/'.$path));
            return response(implode(' | ', array_map(function($failure) {
                return implode(' – ', $failure->errors());
            }, $e->failures())), 400);
        }

        unlink(storage_path('app/'.$path));

        return response()->json(null, 204);
    }
}
