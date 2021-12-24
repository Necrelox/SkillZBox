<?php

class Tools
{
    public static function CreateCondionnalSearch($arrayWithFilter, $filterValid)
    {
        $request = "";
        if (count($arrayWithFilter) >= 1) {
            $key = 0;
            for ($i = 0; $i < count($filterValid); $i++) {
                if (array_key_exists($filterValid[$i], $arrayWithFilter)) {
                    if ($key === 0) {
                        $request .= " WHERE ";
                        $key = 1;
                    } else
                        $request .= 'AND ';
                    $request .= $filterValid[$i] . ' in(';
                    for ($j = 0; $j < count($arrayWithFilter[$filterValid[$i]]); $j++) {
                        $request .= '"' . $arrayWithFilter[$filterValid[$i]][$j] . '"';
                        if ($j + 1 !== count($arrayWithFilter[$filterValid[$i]]))
                            $request .= ",";
                    }
                    $request .= ") ";
                }
            }
        }
        return $request;
    }

    public static function ParseFlagsApi()
    {
        $FindFlags = explode('/', $_SERVER["REQUEST_URI"]);
        $ArrayToFindForView = array();
        foreach ($FindFlags as $element)
            if (substr_count($element, '=') === 1) {
                if (!array_key_exists(explode('=', $element)[0], $ArrayToFindForView))
                    $ArrayToFindForView[explode('=', $element)[0]] = array();
                array_push($ArrayToFindForView[explode('=', $element)[0]], explode('=', $element)[1]);
            }
        return json_encode($ArrayToFindForView);
    }
}